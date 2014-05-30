package com.socket.utils;

//客户端通信线程
//Client.java
import java.util.*;
import java.net.*;
import java.io.*;

import javax.swing.*;

import com.socket.content.Contentdata;

public class Client extends Thread {
	Socket mySocket;
	InetAddress host;
	int port;
	String name;
	BufferedReader theInputStream;
	PrintStream theOutputStream;
	String message;

	// Set<String> listName = new HashSet<String>();

	public Client(String Address, int port, String name) {
		try {
			host = InetAddress.getByName(Address);
			this.port = port;
			this.name = name;
		} catch (IOException e) {

		}
	}

	public void run() {
		try {

			mySocket = new Socket(host, port);
			theOutputStream = new PrintStream(mySocket.getOutputStream());
			theOutputStream.println(name);
			theOutputStream.flush();
			theInputStream = new BufferedReader(new InputStreamReader(
					mySocket.getInputStream()));

			while (true) {

				message = theInputStream.readLine();
				int i = 0;
				int n = 0;
				if (message == null) {
					message = "0#0#";
				} else {
					n = message.length();
					int f = 0;
					for (i = 0; i < n; i++) {
						if (message.charAt(i) == '#')
							f++;
					}
					if (f != 2)
						message = "0#0#";
				}
				String[] list = message.split("#");
				if (!list[0].equals("0")) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("name", list[2]);
					map.put("getname", list[0]);
					map.put("message", list[1]);
					System.out.println("name:" + this.getName());
					System.out.println("getname" + list[0]);
					System.out.println("message" + list[1]);
					Contentdata.messagelist.add(map);
					System.out.println("messagesize----->"
							+ Contentdata.messagelist.size());
				}

			}

		} catch (SocketException e) {

			try {
				mySocket.close();
			} catch (IOException er) {

			}
		} catch (IOException e) {

		}
	}

	public void messageSend(String message) {
		theOutputStream.println(message);
		theOutputStream.flush();
	}

	public String getmessage() {
		return message;
	}
}
