import JSEncrypt from 'jsencrypt';
const Encrypt = new JSEncrypt();
let publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ9/LOr5e8msWupjffUE+my7o7qOKtFa
Yx87iMBaxJExQuMv8zmvwhnRdbFiR/C/Wt0XCMb3AN/CSn0iC9YGJEcCAwEAAQ==
-----END PUBLIC KEY-----`;
export default {
  /**
   * 加密一个参数
   * @param {*} value 需要加密的值
   */
  encrypt(value) {
    Encrypt.setPublicKey(publicKey);
    return Encrypt.encrypt(value);
  },
};