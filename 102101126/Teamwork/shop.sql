create table item(
    id int primary key auto_increment,
    name char(50) not null comment '名称',
    price double comment '价值',
    description varchar(200) comment '描述',
    url char(50) comment '图片链接'
) comment '物品';

create table user(
    id int primary key auto_increment,
    name char(50) comment '昵称',
    reputation int comment '信誉值'
) comment '用户';

create table form(
    id int primary key auto_increment,
    item_id int comment '物品id',
    user_id int comment '用户id',
    status char(2) comment '交易状态',
    start_time datetime comment '开始时间',
    end_time datetime comment '结束时间'
) comment '订单';