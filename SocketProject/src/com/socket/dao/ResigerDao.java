package com.socket.dao;

import java.util.List;
import java.util.Map;
import com.socket.jdbc.JdbcUtils;
import com.socket.service.InforService;
import com.socket.service.ResigerService;

public class ResigerDao implements ResigerService {
	private JdbcUtils jdbcUtils = null;

	public ResigerDao() {
		// TODO Auto-generated constructor stub
		jdbcUtils = new JdbcUtils();
	}

	@Override
	public boolean datalist(List<Object> params) {
		// TODO Auto-generated method stub
		boolean flag = false;
		try {
			jdbcUtils.getConnection();
			String sql = "insert into user(username,pswd,photopath) values(?,?,?)";
			flag = jdbcUtils.updateByPreparedStatement(sql, params);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			jdbcUtils.releaseConn();
		}
		return flag;
	}

}
