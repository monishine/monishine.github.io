# Vue2.0 双向绑定的缺陷？

> Vue2.0的数据响应是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty () 来劫持各个属性的setter、getter，但是它并不算是实现数据的响应式的完美方案，某些情况下需要对其进行修补或者hack这也是它的缺陷，主要表现在两个方面：

**1. vue 实例创建后，无法检测到对象属性的新增或删除，只能追踪到数据是否被修改(Object.defineProperty只能劫持对象的属性)。**

当创建一个Vue实例时，将遍历所有DOM对象，并为每个数据属性添加了get和set。get和set 允许Vue观察数据的更改并触发更新。但是，如果你在Vue实例化后添加（或删除）一个属性，这个属性不会被vue处理，改变get和set。

解决方案：
```js
Vue.set(obj, propertName/index, value)
// 响应式对象的子对象新增属性，可以给子响应式对象重新赋值
data.location = {
    x: 100,
    y: 100
}
data.location = {...data, z: 100}
```

**2. 不能监听数组的变化**

vue在实现数组的响应式时，它使用了一些hack，把无法监听数组的情况通过重写数组的部分方法来实现响应式，这也只限制在数组的push/pop/shift/unshift/splice/sort/reverse七个方法，其他数组方法及数组的使用则无法检测到，例如如下两种使用方式

```js
vm.items[index] = newValue;
vm.items.length
```

vue实现数组响应式的方法

通过重写数组的Array.prototype对应的方法，具体来说就是重新指定要操作数组的prototype，并重新该prototype中对应上面的7个数组方法，通过下面代码简单了解下实现原理：
```js
const methods = ['pop','shift','unshift','sort','reverse','splice', 'push'];
// 复制Array.prototype，并将其prototype指向Array.prototype
let proto = Object.create(Array.prototype);
methods.forEach(method => {
    proto[method] = function () { // 重写proto中的数组方法
        Array.prototype[method].call(this, ...arguments);
        viewRender() // 视图更新
        function observe(obj) {
            if (Array.isArray(obj)) { // 数组实现响应式
                obj.__proto__ = proto; // 改变传入数组的prototype
                return;
            }
            if (typeof obj === 'object') {
                ... // 对象的响应式实现
            }
        }
    }
})
```