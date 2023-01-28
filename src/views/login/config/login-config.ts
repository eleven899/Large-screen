export const rules = {
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '帐号长度必须为6-32位', trigger: 'blur' }
  ],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}
