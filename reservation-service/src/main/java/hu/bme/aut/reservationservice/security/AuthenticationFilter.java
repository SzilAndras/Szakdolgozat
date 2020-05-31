package hu.bme.aut.reservationservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.bme.aut.reservationservice.user.model.LoginDto;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static hu.bme.aut.reservationservice.security.SecurityConstants.*;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            LoginDto applicationUser = new ObjectMapper().readValue(req.getInputStream(), LoginDto.class);



            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            applicationUser.getUsername(),
                            applicationUser.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        Date exp = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
        Key key = Keys.hmacShaKeyFor(KEY.getBytes());
        //Claims claims = Jwts.claims().setSubject(((org.springframework.security.core.userdetails.User) auth
        // .getPrincipal()).getUsername());
        Optional<String> role =
                ((User)auth.getPrincipal()).getAuthorities().stream().map(
                        GrantedAuthority::getAuthority).findFirst();
        String userName = ((org.springframework.security.core.userdetails.User)auth.getPrincipal()).getUsername();
        String token = Jwts.builder()
                .setSubject(userName)
                .claim(AUTHORITIES_KEY, role.orElse(null))
                .signWith(key, SignatureAlgorithm.HS512)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(exp)
                .compact();
        res.addHeader("token", token);
        res.addHeader("Access-Control-Expose-Headers", "*");

    }

}
