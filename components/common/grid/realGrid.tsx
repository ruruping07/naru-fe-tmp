import { useState, useEffect, useRef, useCallback } from 'react'
import { IRealGridProps } from '../../../interface/components/IRealGird'
import Link from 'next/link';

const RealGird: React.FC<IRealGridProps> = (props) => {
  const { gridTitle, loading, id, fields, columns, rows, addFieldColumn } = props;
  const realgridRef = useRef();

  const [provider, setProvider] = useState(null);
  const [gridView, setGridView] = useState(null);

  const setGrid = useCallback((p: any, v: any) => {
    if (p) setProvider(p);
    if (v) setGridView(v);
  }, []);

  useEffect(() => {
    console.log('realGrid useEffect');
    const { LocalDataProvider, GridView } = require('realgrid');
    const current: HTMLElement | any = realgridRef.current;
    const hasGrid = current?.children.length === 1;

    /** 그리드 생성은 한 번만... */
    if (!hasGrid) {
      let p = new LocalDataProvider(false);
      let v = new GridView(realgridRef.current);

      if (setGrid)
        setGrid(p, v)

      v.setDataSource(p);
      if (fields) p.setFields(fields);
      if (columns) v.setColumns(columns);
      if (rows) p.setRows(rows);
    }
  }, []);

  /** fields 가 변경되면 실행 */
  useEffect(() => {
    if (provider) {
      console.log('setFields');
      provider.setFields(fields);
      /** setFields이후 데이터가 리셋되므로 다시 넣어 준다 */
      if (rows) provider.setRows(rows);
    }
  }, [fields]);

  /** columns 가 변경되면 실행 */
  useEffect(() => {
    if (gridView) {
      console.log('setColumns');
      gridView.setColumns(columns);
    }
  }, [columns]);

  /** rows 가 변경되면 실행 */
  useEffect(() => {
    if (provider) {
      console.log('setRows');
      provider.setRows(rows);
    }
  }, [rows]);

  /** addField 콜백이 호출되면 실행 */
  useEffect(() => {
    console.log('addField and Column');
    const newField = addFieldColumn();
    if (provider) provider.addField(newField);
    if (gridView) {
      gridView.addColumn({
        name: newField.fieldName,
        fieldName: newField.fieldName,
        header: {
          title: newField.fieldName,
        },
      });
    }
  }, [addFieldColumn]);

  return (
    <>
      <h2>{gridTitle}</h2>
      <div id={id} className="grid-style" ref={realgridRef}></div>
    </>
  )
}

export default RealGird