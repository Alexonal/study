#include "MySQL_Z.h"

void MySQL_Z::connect()
{
	con = mysql_init(NULL);
	//mysql_set_character_set(con, "utf8");
	mysql_options(con, MYSQL_SET_CHARSET_NAME, "GBK");
	if (!mysql_real_connect(con, this->host.c_str(), this->user.c_str(), this->password.c_str(), this->db.c_str(), this->port, NULL, 0)) {
		fprintf(stderr, "Fail to connect to database: Error:%s\n", mysql_error(con));
	}
}

MySQL_Z::MySQL_Z()
{
	user = "root";
	password = "1234";
	db = "second_practice";
	host = "192.168.72.128";
	port = 3306;
}



MySQL_Z::~MySQL_Z()
{
	mysql_close(con);
}


bool MySQL_Z::insert_user_info(user_ifo& data)
{
	char sql[1024];
	sprintf_s(sql, "insert into user_ifo (username,password,favorite_fruit) values('%s','%s','%s')"
		,data.get_user().c_str(),data.get_pwd().c_str(),data.get_fruit().c_str()
	);
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to insert data: Error:%s\n", mysql_error(con));
		return false;
	}
	return true;
}

bool MySQL_Z::delete_user_info(string condition)
{
	char sql[1024];
	sprintf_s(sql, "delete from user_ifo %s", condition.c_str());
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to delete data: Error:%s\n", mysql_error(con));
		return false;
	}
	return true;
}

bool MySQL_Z::update_user_info(string pwd)
{
	char sql[1024];
	sprintf_s(sql, "update user_ifo set password = '%s'",pwd.c_str());
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to update data: Error:%s\n", mysql_error(con));
		return false;
	}
	return true;
}

user_ifo MySQL_Z::search_user_info(string condition)
{
	user_ifo res;
	char sql[1024];
	sprintf_s(sql, "select * from user_ifo where username = '%s'", condition.c_str());
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to select data: Error:%s\n", mysql_error(con));
		return res;
	}
	MYSQL_RES* result = mysql_store_result(con);
	MYSQL_ROW row;
	row = mysql_fetch_row(result);
	res = { row[1],row[2],row[3] };
	
	mysql_free_result(result);
	return res;
}

string MySQL_Z::CAPTCHA(string username,string new_pwd, string fruit)
{
	string res = "";
	char sql[1024];
	sprintf_s(sql,
		"insert into verification_code_record (username,new_password,favorite_fruit,verification_code) values ('%s','%s','%s',substring(MD5(rand()),1,6))"
		, username.c_str(), new_pwd.c_str(), fruit.c_str()
	);
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to insert data: Error:%s\n", mysql_error(con));
		return res;
	}
	sprintf_s(sql,
		"select verification_code from verification_code_record where username='%s' and new_password='%s' and favorite_fruit='%s' order by id desc limit 0,1;"
		, username.c_str(), new_pwd.c_str(), fruit.c_str()
	);
	if (mysql_query(con, sql)) {
		fprintf(stderr, "Failed to insert data: Error:%s\n", mysql_error(con));
		return res;
	}
	MYSQL_RES* result = mysql_store_result(con);
	MYSQL_ROW row;
	row = mysql_fetch_row(result);
	res = row[0];
	mysql_free_result(result);
	return res;
}
