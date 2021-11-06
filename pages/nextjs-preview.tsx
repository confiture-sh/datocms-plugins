import * as React from 'react'

export type PreviewArgs = {
  websiteBaseUrl: string
  secret: string
  slug: [string]
}

export default function Home(): JSX.Element {
  const datoCmsPluginRef = React.useRef()
  const [previewArgs, setPreviewArgs] = React.useState<PreviewArgs>()

  const goToPreview = () => {
    if (previewArgs) {
      const { websiteBaseUrl, secret, slug } = previewArgs
      window.open(`${websiteBaseUrl}/api/preview?secret=${secret}&slug=${slug.join(',')}`, '_blank')
    }
  }

  /**
   * @description DatoCMS setup with all listener
   */
  React.useEffect(() => {
    ;(window as any).DatoCmsPlugin.init(async (plugin: any) => {
      datoCmsPluginRef.current = plugin
      plugin.startAutoResizer()
      const slug = plugin.getFieldValue('slug')
      const { global, instance } = plugin.parameters
      console.log('🚀 ~ file: nextjs-preview.tsx ~ line 33 ~ ; ~ instance', instance)

      setPreviewArgs({ websiteBaseUrl: global.website, secret: global.secret, slug: [slug.en] })

      // open modal to select a record with itemTypeId #4941
      // For example in the case of a single link, itemTypeId is
      // plugin.field.attributes.validators.item_item_type.item_types[0]
      // plugin.selectItem(4941)
      // .then(function(item) {
      //   if (item) {
      //     console.log('Item selected: ', item);
      //   } else {
      //     console.log('Modal closed!');
      //   }
      // });
      // // open modal to select records with itemTypeId #4941
      // // For example in the case of a multiple links, itemTypeId is
      // // plugin.field.attributes.validators.items_item_type.item_types[0]
      // plugin.selectItem(4941, { multiple: true })
      // .then(function(items) {
      //   if (items) {
      //     console.log('Items selected: ', items);
      //   } else {
      //     console.log('Modal closed!');
      //   }
      // });

      plugin.itemType.relationships.fields.data.forEach(async function (link: any) {
        const block = plugin.fields[link.id]
      })
    })
  }, [])

  return (
    <section aria-labelledby='summary-heading'>
      <div>
        <button
          type='submit'
          onClick={goToPreview}
          className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'>
          Preview
        </button>
      </div>

      <div className='mt-6 text-sm text-center text-gray-500'>
        <p>
          or{' '}
          <a href='#' className='text-indigo-600 font-medium hover:text-indigo-500'>
            view published <span aria-hidden='true'> &rarr;</span>
          </a>
        </p>
      </div>
    </section>
  )
}
