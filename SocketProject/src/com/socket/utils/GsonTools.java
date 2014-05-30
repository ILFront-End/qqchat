package com.socket.utils;

import com.google.gson.Gson;

public class GsonTools {

	public static String GsonString(Object src) {

		Gson gson = new Gson();
		return gson.toJson(src);
	}
}
