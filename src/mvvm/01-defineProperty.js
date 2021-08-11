// 数组响应式
// 1. 替换数组原型中7个方法
const orginalProto = Array.prototype;
// 备份一份，修改备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function () {
    // 原始操作
    orginalProto[method].apply(this, arguments);
    // 覆盖操作：通知更新
    console.log("数组执行" + method + "操作");
  };
});

// 对象响应式
// 对象响应式原理
// 1. Object.defineProperty()

function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", newVal);
        observe(newVal);
        val = newVal;
      }
    },
  });
}

// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部元素执行响应化
    const keys = Object.keys(obj);
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 } };
// defineReactive(obj, "foo", "foo1");
observe(obj);
// obj.foo;
// obj.foo = "foo2";
// obj.bar;
// obj.baz.a = 10;
// obj.baz = { a: 10 }; // 新的值为对象
//obj.baz.a = 100;
// obj.dong = "dong"; // 对于新的属性处理
set(obj, "dong", "dong1");
obj.dong;

// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方法：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr = [];
obj.arr.push(4);
