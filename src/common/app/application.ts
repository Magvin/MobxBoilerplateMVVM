import { action, makeAutoObservable, observable } from "mobx"
import { Subject } from "rxjs"
import { filter } from "rxjs/operators"

export class Application implements Common.IApplication {
  eventBus: Subject<Common.IAppEvent>
  servicesFactories: Common.IDictionary<Common.ServiceFactory>

  @observable services: Common.IDictionary<any> = {}
  @observable.ref features: Common.IFeature[] = []

  constructor() {
    this.eventBus = new Subject<Common.IAppEvent>()
    this.servicesFactories = {}
    makeAutoObservable(this)
  }
  @action.bound
  registerFeature(feature: Common.IFeature) {
    this.features = [...this.features, feature]
  }
  @action.bound
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on<TData = any>(eventType: string, callback: Common.Callback<TData>): Common.CleanupFn {
    const subscription = this.eventBus.pipe(filter((evt: any) => evt.type === eventType)).subscribe(callback)

    return () => subscription.unsubscribe()
  }
  @action.bound
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger<TData = any>(eventType: string, data: TData): void {
    this.eventBus.next({
      type: eventType,
      data,
    })
  }
  @action.bound
  registerService<TService>(key: string, factory: Common.ServiceFactory<TService>): Common.IApplication {
    if (this.services[key]) {
      throw new Error(`A service instance with the same key is already instantiated: ${key}`)
    }

    if (this.servicesFactories[key]) {
      throw new Error(`A service with the same key is already registered: ${key}`)
    }

    this.servicesFactories[key] = factory
    return this
  }
  @action.bound
  getService<TService>(key: string): TService {
    if (this.services[key]) {
      return this.services[key]
    }
    if (!this.servicesFactories[key]) {
      throw new Error(`No service with the provided key can be found: ${key}`)
    }
    return (this.services[key] = this.servicesFactories[key](this))
  }
}
