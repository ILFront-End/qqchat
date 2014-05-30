package com.socket.main;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.socket.dao.LoginDao;
import com.socket.dao.ResigerDao;

public class testmain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//testresiger();
		tetslogin();
	}

	public static void tetslogin() {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Object> login = new ArrayList<Object>();
		login.add("123");
		login.add("123p");
		LoginDao dao = new LoginDao();
		list = dao.datalist(login);
		System.out.println("login--------->" + list.toString());
	}

	public static void testresiger() {

		List<Object> resiger = new ArrayList<Object>();
		resiger.add("123");
		resiger.add("123p");
		ResigerDao dao = new ResigerDao();
		System.out.println("resiger--------->" + dao.datalist(resiger));
	}
}
