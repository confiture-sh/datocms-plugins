# plugin.theme

console.log(plugin.theme);

plugin.setFieldValue('title', 'New title!');

// get the value of the 'title' field
console.log(plugin.getFieldValue('title'));
// if the field is multi-language, both of these methods are fine:
console.log(plugin.getFieldValue('title.en'));
console.log(plugin.getFieldValue('title', 'en'));
// get field's current value
console.log(plugin.getFieldValue(plugin.fieldPath));

plugin.saveCurrentItem()
.then(() => console.log('Record saved!'))
.catch(() => console.log('Could not save this record'));
