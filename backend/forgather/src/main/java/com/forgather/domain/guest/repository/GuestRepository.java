package com.forgather.domain.guest.repository;

import org.springframework.stereotype.Repository;

import com.forgather.domain.guest.model.Guest;

@Repository
public interface GuestRepository {

    Guest save(Guest guest);

    Guest getById(Long id);
}
