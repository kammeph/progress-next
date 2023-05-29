CREATE TABLE `progress_user_roles` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`role` enum('ADMIN','TRAINER','TRAINEE') NOT NULL);
--> statement-breakpoint
CREATE TABLE `progress_users` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`locale` varchar(10),
	`can_login` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE INDEX `user_roles_user_id_idx` ON `progress_user_roles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_idx` ON `progress_users` (`username`);