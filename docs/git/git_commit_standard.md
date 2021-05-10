# git代码提交规范

## 代码提交规范

变量说明：

- `<msg>` = `提交备注信息`

可用前缀：`feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build`

```js
// 正则表达式匹配规则
const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?!?: .{1,50}/
```

```bash
# 新需求/新特性 注意英文 : 后面有一个空格
# 示例：git commit -m 'feat: 新增搜索功能'
git commit -m 'feat: <msg>'
# 修复问题
git commit -m 'fix(v-model): <msg>'
# 文档类
git commit -m 'docs: <msg>'
# 工作流程
git commit -m 'workflow: <msg>'
# 代码风格
git commit -m 'style: <msg>'
# 其它琐事
git commit -m 'chore: <msg>'
# 重构
git commit -m 'refactor: <msg>'
# 更改某个需求或则特性 后面加个 ! 号
git commit -m 'feat!: <msg>'
# 恢复某种功能
git commit -m 'revert: feat: <msg>'
```

## 修改提交记录

```bash
# 修改提交记录
git commit --amend
```
