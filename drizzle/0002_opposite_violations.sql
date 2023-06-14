CREATE TABLE `progress_adaption_factors` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`gender` enum('MALE','FEMALE') NOT NULL,
	`weight` decimal(4,1) NOT NULL,
	`height` decimal(4,1) NOT NULL,
	`strength_level` enum('ELITE','MASTER','CLASS_1','CLASS_2','CLASS_3','CLASS_4','CLASS_5') NOT NULL,
	`gender_factor` int NOT NULL,
	`weight_factor` int NOT NULL,
	`height_factor` int NOT NULL,
	`strength_level_factor` int NOT NULL,
	`experience_factor` int NOT NULL,
	`age_factor` int NOT NULL,
	`nutrition_factor` int NOT NULL,
	`sleep_factor` int NOT NULL,
	`stress_factor` int NOT NULL,
	`recovery_factor` int NOT NULL,
	`adaption_factor` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `progress_strength_values` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`squat_weight` decimal(4,1) NOT NULL,
	`squat_reps` int NOT NULL,
	`squat_1rm` decimal(4,1) NOT NULL,
	`bench_weight` decimal(4,1) NOT NULL,
	`bench_reps` int NOT NULL,
	`bench_1rm` decimal(4,1) NOT NULL,
	`deadlift_weight` decimal(4,1) NOT NULL,
	`deadlift_reps` int NOT NULL,
	`deadlift_1rm` decimal(4,1) NOT NULL,
	`overhead_press_weight` decimal(4,1) NOT NULL,
	`overhead_press_reps` int NOT NULL,
	`overhead_press_1rm` decimal(4,1) NOT NULL,
	`total` decimal(4,1) NOT NULL,
	`safety_factor` decimal(4,1) NOT NULL,
	`rounding_factor` decimal(4,1) NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `adaption_factors_user_id_idx` ON `progress_adaption_factors` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `strength_values_user_id_idx` ON `progress_strength_values` (`user_id`);