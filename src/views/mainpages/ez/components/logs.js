export default [
    {
        logTime: '2022-01-12',
        logVersion: '1.1.7',
        logValue: `1. 新增dns爆破时，如果泛解析子域名解析数量达到爆破10%，则认为泛解析
2. 修复漏洞入库漏洞，感谢@niuguanjie
3. 修改创建任务逻辑，创建任务更快，感谢@niuguanjie
4. 修改web前端漏洞展示不规范，感谢@xulewei3
5. 修改子域名解析模块，不解析探测a记录时候cname和主域名不一致的情况
6. 修改jeecms ssti模块，使用--exploit时候才上传shell，感谢@wangdan3
7. 新增shiro自定义key，感谢@yanhan
8. 新增shiro key: ZmVic19zaGlyb19rZXkAAA==，感谢@yanhan
9. 新增config.yaml 可配置web各个模块速率
10. 修改coremail 目录跨越插件误报问题
11. 修改自定义dns服务器在配置文件
12. 新增metersphere-v1154-rce.yml
13. 新增metersphere-plugin-rce.yml
14. 新增grafana-snapshot-auth-bypass-cve-2021-39226.yml
15. 新增lf-default-password.yml
16. 新增atlassiancrowd-rce-cve-2019-11580
17. 新增mailgard-webmail-default-password
18. ez web新增--safe-path参数，如设置则第一次需访问该路径，感谢baiyansong2`
    },
    {
        logTime: '2022-01-05',
        logVersion: '1.1.6',
        logValue: `1. 新增jeecms-freemarker-ssti
2. 修复json格式参数的修改数据问题
3. web前端子域名模块显示与数据不一致问题
4. 修改subdomain api模块速率问题，更快收集子域
5. config.yaml限制api子域名收集个数
6. 新增discuz-ml-cnvd-2019-22239-rce
7. 新增web任务删除功能
8. 修复web封锁主机统计bug
9. 新增whir-ezoffice-oa-file-upload-1
10. 新增whir-ezoffice-oa-file-upload-2
11. 新增huayu-reporter-rce
12. 新增adselfserviceplus-rce-cve-2021-40539
13. 新增apache-httpd-ssrf-cve-2021-40438
14. 新增craftcms-seomatic-rce-cve-2020-9597
15. 新增 dubbo-admin-default-password
16. 新增zhongkewangwei-nf-password-leak
17. 新增jeecms-x160-upload`
    },
    {
        logTime: '2021-12-29',
        logVersion: '1.1.5',
        logValue: `1. 新增log4j hotfix 的漏洞提示
2. 新增log4j的在body为json时的畸形payload
3. 修改es的结构字段
4. 修改log4j，变形payload 漏报问题
5. 新增poc-yaml-apisix-dashboard-unauthorized
6. 新增airflow-unauth
7. 新增drupal-cve-2014-3704-sqli
8. 新增seacms-sqli
9. 新增seeyon-wooyun-2015-0108235-sqli 
10. 新增finecms-sqli
11. 新增--check-reverse 参数，检测反连是否生效，详见ez -h
12. 优化backup-file扫描模块
13. 新增poc-yaml-unifi-network-log4j-rce`
    }
]