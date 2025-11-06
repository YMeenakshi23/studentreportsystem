package com.report.studentsystem.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.report.studentsystem.service.UserDetailsServiceImpl;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

 @Autowired
 private UserDetailsServiceImpl userDetailsService;

 @Autowired
 private JwtUtil jwtUtil;

 @Override
 protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws ServletException, IOException {

     final String authorizationHeader = request.getHeader("Authorization");

     String username = null;
     String jwt = null;

     // Check if the header is present and starts with "Bearer "
     if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
         jwt = authorizationHeader.substring(7);
         try {
             username = jwtUtil.extractUsername(jwt);
         } catch (IllegalArgumentException e) {
             System.out.println("Unable to get JWT Token");
         } catch (ExpiredJwtException e) {
             System.out.println("JWT Token has expired");
         }
     }

     // If we have a username and the user is not already authenticated
     if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
         UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

         // If the token is valid, configure Spring Security to manually set authentication
         if (jwtUtil.validateToken(jwt, userDetails)) {
             UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                     userDetails, null, userDetails.getAuthorities());
             usernamePasswordAuthenticationToken
                     .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
             // After setting the Authentication in the context, we specify
             // that the current user is authenticated. So it passes the
             // Spring Security Configurations successfully.
             SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
         }
     }
     chain.doFilter(request, response);
 }
}