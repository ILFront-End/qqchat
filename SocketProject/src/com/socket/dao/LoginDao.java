package com.socket.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.socket.jdbc.JdbcUtils;
import com.socket.service.InforService;

public class LoginDao implements InforService {
	private JdbcUtils jdbcUtils = null;

	public LoginDao() {
		// TODO Auto-generated constructor stub
		jdbcUtils = new JdbcUtils();
	}

	@Override
	public List<Map<String, Object>> datalist(List<Object> params) {
		// TODO Auto-generated method stub
		String sql = "select * from user where username=? and pswd=?";
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			jdbcUtils.getConnection();
			Map<String, Object> result = jdbcUtils
					.findSimpleResult(sql, params);
			if (!result.isEmpty())
				list.add(result);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			jdbcUtils.releaseConn();
		}
		return list;
	}

}
