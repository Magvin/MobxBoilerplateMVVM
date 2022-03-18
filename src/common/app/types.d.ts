declare namespace Common {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface IAppEvent<TData = any> {
    type: string
    data: TData
  }

  export type Callback<TData> = (evt: IAppEvent<TData>) => void

  export type CleanupFn = () => void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type ServiceFactory<TService = any> = (app: IApplication) => TService

  export type IDictionary<TValue> = {
    [idx: string]: TValue
  }

  export interface IModelReceiverProps<TModel> {
    model: TModel
  }

  export interface IAuthClientReceiverProps<TAuthClient> {
    authClient: TAuthClient
  }

  export interface IApplication {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on<TData = any>(eventType: string, callback: Callback<TData>): CleanupFn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger<TData = any>(eventType: string, data: TData): void
    registerService<TService>(key: string, factory: ServiceFactory<TService>): IApplication
    getService<TService>(key: string): TService

    registerFeature(feature: IFeature)
  }

  export interface ApplicationProps {
    application?: IApplication
  }

  export interface IHttpRequestConfig {
    headers?: IDictionary<string>
  }

  export interface IHttpClient<TConfig extends IHttpRequestConfig = IHttpRequestConfig> {
    head<TData>(url: string, config?: TConfig): Promise<TData>
    get<TData>(url: string, config?: TConfig): Promise<TData>
    delete<TData>(url: string, headers?: TConfig): Promise<TData>
    put<TData, TBody>(url: string, body: TBody, headers?: TConfig): Promise<TData>
    post<TData, TBody>(url: string, body: TBody, headers?: TConfig): Promise<TData>
    patch<TData, TBody>(url: string, body: TBody, headers?: TConfig): Promise<TData>
  }

  export type AccessToken = string

  export interface IFeature {
    key: string
    label: string
    path: string
    getView(): React.ReactNode
  }

  export interface IListItem<TLabel = string, TValue = string> {
    label: TLabel
    value: TValue
  }
}
