import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Person } from './model';
import { Service } from './service';

export class PersonDataSource extends DataSource<Person | undefined> {
  public cachedData = Array.from<Person>({
    length: 0,
  });
  public dataStream = new BehaviorSubject<(Person | null)[]>(this.cachedData);
  private fetchedPages = [];
  private subscription = new Subscription();
  private pageSize = 10;
  private lastPage = 0;
  private count = 0;

  constructor(private service: Service) {
    super();
    this.setUp();
  }

  hasData(): boolean {
    return !!this.dataStream.value.length;
  }

  async setUp(): Promise<void> {
    this.fetchedPages = [];
    const count = this.service.getCount();
    this.cachedData = Array.from<Person>({
      length: count,
    });
    this.dataStream.next(this.cachedData);
    this.count = count;
    this._fetchPage();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(Person | undefined)[] | ReadonlyArray<Person | undefined>> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const currPage = this._getPageForIndex(range.end);
        if (!this.fetchedPages.includes(currPage)) {
          this._fetchPage(this.pageSize, currPage);
          this.fetchedPages.push(currPage);
          if (currPage != 1 && !this.fetchedPages.includes(currPage - 1)) {
            this._fetchPage(this.pageSize, currPage - 1);
            this.fetchedPages.push(currPage - 1);
          }
          if (!this.fetchedPages.includes(currPage + 1)) {
            this._fetchPage(this.pageSize, currPage + 1);
            this.fetchedPages.push(currPage + 1);
          }
        }
      })
    );

    return this.dataStream;
  }

  disconnect(_: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

  private _fetchPage(take: number = this.pageSize, page = 0) {
    if (take < 0 || page < 0) return;
    const skip = page * take;
    const res = this.service.getData(take, skip);

    if (res.length) {
      for (let i = skip; i < take + skip; i++) {
        if (i < this.count) {
          this.cachedData[i] = res[i - skip];
        }
      }
      this.dataStream.next(this.cachedData);
    }
  }
}
