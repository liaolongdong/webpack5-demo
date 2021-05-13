# lint-staged集成说明文档

## 常见错误

错误提示：Unstaged changes could not be restored due to a merge conflict!

解决方案：删除生成的`.eslintcache`文件并加入到`.gitignore`文件中，忽略git提交
