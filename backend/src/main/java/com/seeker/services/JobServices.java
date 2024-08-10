package com.seeker.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.seeker.dto.JobDTO;
import com.seeker.exception.BackendException;
import com.seeker.model.Address;
import com.seeker.model.Job;
import com.seeker.model.User;
import com.seeker.repository.JobRepository;
import com.seeker.repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class JobServices {

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private JobRepository jobRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public Object getAllJobs() {
		
		return jobRepo.findAll().stream()
				.map(e-> mapper.map(e, JobDTO.class))
				.collect(Collectors.toList());
	}
	
	public Object createJob(@Valid JobDTO jobDto, HttpServletResponse response) {
		User user = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow(() -> new BackendException("User not Found"));
        }
        Job job = mapper.map(jobDto, Job.class);
        Address Address = job.getJobLocation();
		
		// Important
		Address.setJobId(job);
		job.setJobLocation(Address);
        job.setCreator(user);
        List<Job> jobs = user.getJobsPosted();
        jobs.add(job); 
        user.setJobsPosted(jobs);
        jobRepo.save(job);
		return "Job Created";
	}

	public Object getJob(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object updateJob(@Valid String id, JobDTO jobDto) {
		// TODO Auto-generated method stub
		return null;
	}



	
}
