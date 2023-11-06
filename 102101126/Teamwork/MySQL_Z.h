#pragma once
#include<mysql.h>
#include<iostream>
#include<string>
#include<vector>
using namespace std;

class user_ifo {
private:
	string user_name = "";
	string pwd = "";
	string favorite_fruit = "";
public:
	string get_user() {
		return user_name;
	}
	string get_pwd() {
		return pwd;
	}
	string get_fruit() {
		return favorite_fruit;
	}
	user_ifo(string user = "", string pwd = "" ,string fruit = "") {
		this->user_name = user;
		this->pwd = pwd;
		this->favorite_fruit = fruit;
	}
	bool check(string user, string passwd) {
		return user == user_name && passwd == pwd;
	}
	bool safety_check(string user,string fruit) {
		return user == user_name && favorite_fruit == fruit;
	}
};

class MySQL_Z
{
public:

	void connect();
	MySQL_Z();
	~MySQL_Z();
	bool insert_user_info(user_ifo& data);
	bool delete_user_info(string condition);
	bool update_user_info(string pwd);
	user_ifo search_user_info(string condition = "");
	string CAPTCHA(string username, string new_pwd, string fruit);

private:
	MYSQL* con;
	string host;
	string user;
	string password;
	string db;
	//string table;
	unsigned int port;
};
