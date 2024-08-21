interface Foo {
    add(num: number): this;
  }
  
  // 报错
  type Foo = {
    add(num: number): this;
  };