/* tslint:disable */
/* eslint-disable */

//==============================================================
// Real Grid 공통
//==============================================================

export interface IRealGridProps {
  gridTitle: string
  loading: boolean
  id?: string;
  fields?: any[]
  columns?: any[]
  rows?: any[]
  addFieldColumn?: () => any
}
