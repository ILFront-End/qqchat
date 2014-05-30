package com.socket.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.socket.content.Contentdata;
import com.socket.utils.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Chataction extends HttpServlet {
	// boolean flag = false;

	/**
	 * Constructor of the object.
	 */
	public Chataction() {
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

		response.setContentType("text/html;charset=utf-8");
		final PrintWriter out = response.getWriter();

		String user = request.getParameter("username");
		//System.out.println("chatuser------>" + user);
		// System.out
		// .println("listsize1------->" + Contentdata.messagelist.size());
		//out.print("180:123");
		for (int i = 0; i < Contentdata.messagelist.size(); i++) {
			String name = Contentdata.messagelist.get(i).get("getname").toString();
			System.out.println("请求消息人:"+name);
			if (name.equals(user)) {

				String msg = Contentdata.messagelist.get(i).get("name")
						.toString()
						+ ":"
						+ Contentdata.messagelist.get(i).get("message")
								.toString();
				
				System.out.println("getmessage:" + msg);
				out.print(msg);
				Contentdata.messagelist.remove(i);
				
				break;
			}
		}
		// System.out
		// .println("listsize2------->" + Contentdata.messagelist.size());

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
		System.out.println("inist");
	}

}
