package com.socket.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.socket.content.Contentdata;
import com.socket.dao.LoginDao;
import com.socket.dao.ResigerDao;
import com.socket.service.InforService;
import com.socket.utils.Client;

public class ResigerAction extends HttpServlet {
	private ResigerDao mInforService;

	/**
	 * Constructor of the object.
	 */
	public ResigerAction() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = request.getContextPath();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();

		String name = request.getParameter("username");
		String pswd = request.getParameter("pswd");
		int index = (int) Math.floor(Math.random() * 8 + 1);
		String pathuser = "../userphotos/" + index + ".jpg";
		System.out.println("path----->" + pathuser);
		List<Object> params = new ArrayList<Object>();
		params.add(name);
		params.add(pswd);
		params.add(pathuser);
		boolean flag = mInforService.datalist(params);
		// if(flag)
		System.out.println("ע��״̬----->" + flag);
		out.flush();
		out.close();

	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		mInforService = new ResigerDao();
	}

}
