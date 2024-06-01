/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
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