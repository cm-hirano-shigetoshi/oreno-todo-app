import SHA256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

export function hashObject(obj: any): string {
  // Step 1: オブジェクトを文字列に変換
  const str = JSON.stringify(obj);

  // Step 2: 文字列をハッシュ化
  const hashedValue = SHA256(str);

  // Step 3: ハッシュ値を16進数の文字列に変換
  return hashedValue.toString(encHex);
}
