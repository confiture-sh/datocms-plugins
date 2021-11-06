import * as React from 'react'
import { isEmpty } from 'lodash'
import Head from 'next/head'
import { useForm, useFieldArray } from 'react-hook-form'
import { PlusIcon } from '@heroicons/react/solid'
import * as yup from 'yup'

export type FieldValue = {
  placeholder: string
}

export type DynamicTableFormat = {
  head: FieldValue[]
  body: FieldValue[]
}

// export const validationSchema = yup.object().shape({
//   countries: yup.array(
//     yup.object().shape({
//       name: yup.string().required(),
//       cities: yup.array(
//         yup.object().shape({
//           name: yup.string().required(),
//           description: yup.string(),
//         }),
//       ),
//     }),
//   ),
// })

export const defaultValues = {
  head: [
    { name: 'head', fields: [] },
    { name: 'body', fields: [] },
  ],
}

export default function Home(): JSX.Element {
  const datoCmsPluginRef = React.useRef()

  const { control, register, watch, handleSubmit } = useForm({
    defaultValues,
    // mode: 'onChange',
  })

  const values = watch()
  console.log('🚀 ~ file: index.tsx ~ line 45 ~ Home ~ values', values)

  const head = useFieldArray({
    control,
    name: 'head',
  })

  // const body = useFieldArray({
  //   control,
  //   name: 'json',
  // })

  /**
   *
   */
  React.useEffect(() => {
    ;(window as any).DatoCmsPlugin.init((plugin: any) => {
      datoCmsPluginRef.current = plugin
      plugin.startAutoResizer()
      plugin.addFieldChangeListener(plugin.fieldPath, (newValue: any) => {
        // console.log('🚀 ~ file: index.tsx ~ line 30 ~ plugin.addFieldChangeListener ~ newValue', newValue)
      })
    })
  }, [])

  const addColumn = () => {
    head.append({ name: `head.${head.fields.length + 1}` })
    // head.append({ placeholder: 'column 1' })
    // `head.${fieldIdx}`
    //   plugin.setFieldValue(plugin.fieldPath, e.target.value);
  }

  // const addRow = () => {
  //   setTable({
  //     ...table,
  //     body: [...table.body, table.head.map(h => DEFAULT_BODY_VALUE)],
  //   })
  // }

  // const updateHead = (index: number, value: string) => {
  //   setTable({ ...table, head: [...table.head.splice(index, 1, { value })] })
  // }

  // const updateBody = (x: number, y: number, value: string) => {
  //   setTable({ ...table })
  // }

  if (isEmpty(head.fields)) {
    return (
      <div className='text-center'>
        <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path
            vectorEffect='non-scaling-stroke'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
          />
        </svg>
        <h3 className='mt-2 text-sm font-medium text-gray-900'>No Columns</h3>
        <p className='mt-1 text-sm text-gray-500'>Get started by creating your first table column.</p>
        <div className='mt-6'>
          <button
            type='button'
            onClick={addColumn}
            className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            New Column
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <span className='relative z-0 inline-flex shadow-sm rounded-md mb-4'>
        <button
          type='button'
          onClick={addColumn}
          className='relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
          Add Column
        </button>
        <button
          type='button'
          // onClick={addRow}
          className='-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
          Add Row
        </button>
      </span>

      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-sm'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  {head.fields.map(({ id, ...attrs }, fieldIdx) => {
                    // console.log(register(`json.${fieldIdx}.name`))

                    return (
                      <th
                        key={id}
                        scope='col'
                        className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        <input
                          type='text'
                          className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-sm'
                          {...register(`head.${fieldIdx}`)}
                          {...attrs}
                        />
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {/* {body.fields.map((field, fieldIdx) => (
                  <td key={fieldIdx} className='px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <input
                      key={field.id}
                      {...register(`jsonDynamicTable.${fieldIdx}.value`)}
                      //  name={`$ref.body.${rowItems}${itemIdx}`}
                      //  value={value}
                      //  onChange={e => updateBody(rowIdx, itemIdx, e.target.value)}
                      className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-sm'
                    />
                  </td>
                ))} */}

                {/* {table.body.map((rowItems, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {rowItems.map(({ value }, itemIdx) => (
                      <td key={itemIdx} className='px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900'>
                        <input
                          type='text'
                          name={`$ref.body.${rowItems}${itemIdx}`}
                          value={value}
                          onChange={e => updateBody(rowIdx, itemIdx, e.target.value)}
                          className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-sm'
                        />
                      </td>
                    ))}
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
