import * as React from 'react'
import * as Heroicons from '@heroicons/react/outline'
import Select, { SingleValue } from 'react-select'
import camelCaseToNormal from '@/lib/camelCaseToNormal'
import { capitalize } from 'lodash'

export type PreviewArgs = {
  websiteBaseUrl: string
  secret: string
  slug: [string]
}

export type FieldFormat = {
  icon: string
}

type Option = SingleValue<{ value: string; label: JSX.Element }>

export default function Home(): JSX.Element {
  const datoCmsPluginRef = React.useRef<any>()
  const [selectedOption, setSelectedOption] = React.useState(-1)

  const options = Object.keys(Heroicons).map(key => {
    const Icon = (Heroicons as any)[key]
    const name = capitalize(camelCaseToNormal(key).split(' ').slice(0, -1).join(' '))

    return {
      value: key,
      label: (
        <div className='inline-flex items-center px-2'>
          <span>
            <Icon className='h-6 w-6' />
          </span>
          <span className='ml-8'>{name}</span>
        </div>
      ),
    }
  })

  const updateValue = async (option: Option) => {
    if (option?.value) {
      const v: FieldFormat = { icon: option.value }
      await datoCmsPluginRef.current?.setFieldValue(datoCmsPluginRef.current?.fieldPath, JSON.stringify(v))
    }
  }

  /**
   * @description DatoCMS setup with all listener
   */
  React.useEffect(() => {
    ;(window as any).DatoCmsPlugin.init(async (plugin: any) => {
      datoCmsPluginRef.current = plugin
      plugin.startAutoResizer()

      let idx = 0
      const current = plugin.getFieldValue(plugin.fieldPath)
      if (current) {
        const obj = JSON.parse(current)
        idx = options.findIndex(item => item.value === obj.icon)
      }

      setSelectedOption(idx === -1 ? 0 : idx)
    })
  }, [])

  if (selectedOption === -1) {
    return <span>Loading</span>
  }

  return (
    <section className='w-full flex flex-col h-40 py-2 px-0.5' aria-labelledby='summary-heading'>
      <Select
        className='basic-single'
        name='icon'
        options={options}
        styles={{
          menu: attrs => ({
            ...attrs,
            borderRadius: 0,
          }),
          control: attrs => ({
            ...attrs,
            borderRadius: 0,
          }),
        }}
        maxMenuHeight={100}
        defaultValue={options[selectedOption]}
        isClearable={true}
        isSearchable={true}
        onChange={option => updateValue(option)}
      />
    </section>
  )
}
