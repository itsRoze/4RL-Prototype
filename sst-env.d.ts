/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    DatabaseUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    PublicDomain: {
      type: "sst.sst.Secret"
      value: string
    }
    SupabaseAnonKey: {
      type: "sst.sst.Secret"
      value: string
    }
    SupabaseUrl: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}