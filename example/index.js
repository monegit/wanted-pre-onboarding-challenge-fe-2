/**
 * @private
 * @type {Item[]}
 * @description - 모든 To-Do의 아이템을 저장합니다.
 */
let todoItems = [];

/**
 * @private
 * @type {number}
 * @description - 유니크 id를 저장합니다.
 */
let uniqueId = 0;

/**
 * todo의 모델입니다.
 * @class
 */
class Item {
  /**
   * To-Do Model
   * @constructor
   * @param {Object} todo - 모델의 정보를 담고있는 Object
   * @param {number} todo.id - 아이디
   * @param {string} todo.content - 내용
   * @param {boolean} todo.isCompleted - 완료여부
   * @param {string} todo.category - 카테고리
   * @param {string[]} [todo.tags] - 태그들
   */
  constructor(todo) {
    this.id = todo.id;
    this.content = todo.content;
    this.isCompleted = todo.isCompleted;
    this.category = todo.category;
    this.tags = todo.tags;
  }
}

/**
 * @class
 */
export class Todo {
  /**
   * To-Do Item의 특정 id 혹은 모두를 읽어옵니다.
   * @param {number} [id] - todo에서 아이템 정보를 불러올 id값
   */
  read(id) {
    // id가 undefined면 모든 아이템을 반환
    if (id === undefined) return todoItems;
    else return todoItems[id];
  }

  /**
   * 모든 아이템 요소를 삭제합니다.
   */
  clear() {
    todoItems = [];
  }

  /**
   * 아이템을 추가, 제거, 수정합니다.
   * @param {number} id - item 상태를 변경할 id
   */
  items(id) {
    return new Items(id);
  }
}

/**
 * 아이템에 관련된 기능을 수행합니다.
 * @class
 */
class Items {
  /**
   * @param {number} [id] - todo에서 변경할 아이템의 id
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * To-Do Item을 생성합니다.
   * @param {string} content - todo에 추가할 내용
   */
  add(content) {
    if (content === "" || content === undefined)
      // 내용이 없으면 에러
      throw new Error("content가 비어있습니다.");
    todoItems.push(
      new Item({
        id: uniqueId,
        content: content,
        isCompleted: false,
        category: "",
        tags: [],
      })
    );

    uniqueId += 1;
  }

  /**
   * To-Do Item을 변경합니다.
   * @param {Object} todo - 모델의 정보를 담고있는 Object
   * @param {string} [todo.content] - 수정할 내용
   * @param {boolean} [todo.isCompleted] - 수정할 완료여부
   * @param {string} [todo.category] - 수정할 카테고리
   * @param {string[]} [todo.tags] - 수정할 태그들
   */
  update(todo) {
    todoItems[this.id] = new Item({
      id: this.id,
      content: todo.content ?? todoItems[this.id].content,
      isCompleted: todo.isCompleted ?? todoItems[this.id].isCompleted,
      category: todo.category ?? todoItems[this.id].category,
      tags: todo.tags ?? todoItems[this.id].tags,
    });
  }

  /**
   * 해당 id의 아이템을 제거합니다.
   */
  remove() {
    todoItems.forEach((item, index) => {
      if (item.id === this.id) todoItems.splice(index, 1);
    });
  }

  /**
   * 태그의 상태를 수정합니다.
   */
  tags() {
    return new Tags(this.id);
  }
}

/**
 * 태그와 관련된 기능을 수행합니다.
 */
class Tags {
  constructor(id) {
    this.id = id;
  }

  /**
   * 해당 문자열로 구성된 태그를 제거합니다.
   * @param {string} tag - 찾을 태그의 내용
   */
  removeAt(tag) {
    todoItems[this.id].tags.forEach((value, tagIndex) => {
      if (value === tag) todoItems[this.id].tags.splice(tagIndex, 1);
    });
  }

  /**
   * 모든 태그를 제거합니다.
   */
  removeAll() {
    todoItems[this.id].tags = [];
  }
}
