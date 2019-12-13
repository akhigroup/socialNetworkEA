package edu.mum.ea.socialnetwork.services;

import edu.mum.ea.socialnetwork.domain.Post;
import edu.mum.ea.socialnetwork.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface PostService {
    Post save(Post post);

    List<Post> findPost();

    Post findPostById(Long id);

}
