# v-model的作用

v-model本质上不过是语法糖，可以用 v-model 指令在表单及元素上创建双向数据绑定。

它会根据控件类型自动选取正确的方法来更新元素
它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
v-model会忽略所有表单元素的value、checked、selected特性的初始值,而总是将 Vue 实例的数据作为数据来源，因此我们应该通过 JavaScript 在组件的data选项中声明初始值

### 扩展：

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

text 和 textarea 元素使用value属性和input事件；

checkbox 和 radio 使用checked属性和change事件；

select 字段将value作为 prop 并将change作为事件。