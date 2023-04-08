export function formatPhone(phone: string): string {
  // 这里要去掉所有的非数字输入，不能只替换前后的空格。
  let trim: string = phone.replace(/\D?/g, '');
  const result = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)]
    .filter((item) => !!item) // 过滤掉空值
    .join(' ');
  return result;
}

export function replaceBlank(phone: string): string {
  return phone ? phone.replace(/\D?/g, '') : '';
}
