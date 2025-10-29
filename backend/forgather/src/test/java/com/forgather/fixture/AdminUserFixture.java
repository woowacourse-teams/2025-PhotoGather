package com.forgather.fixture;

import com.forgather.back_office.model.AdminUser;

public class AdminUserFixture {

    private AdminUserFixture() {
    }

    public static AdminUser createAdminUser() {
        return new AdminUser("admin", "password");
    }

    public static AdminUser createAdminUser(String username, String password) {
        return new AdminUser(username, password);
    }
}
