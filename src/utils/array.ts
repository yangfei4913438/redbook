import { intersectionBy } from 'lodash';

/**
 * 求2个数组的并集，并集通过一个唯一属性来实现去重
 * @param from 新数组
 * @param to 目标数组
 * @param unique 数组元素的唯一属性
 * @return
 * */
export const arrayConcatBy = <P, T extends keyof P>(from: P[], to: P[], unique: T): P[] => {
  // 取出相同数据的属性值
  const sameArticles = intersectionBy(from, to, unique).map((o) => o[unique]);
  // 筛选掉相同属性值的数据
  const newArticles = from.filter((o) => !sameArticles.includes(o[unique]));
  // 不重复的数据才能执行更新
  return to.concat(newArticles);
};
