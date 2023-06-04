CREATE TABLE `progress_exercise_groups` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
	`name` varchar(255) NOT NULL,
	`index` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `progress_exercises` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
	`exercise_group_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`index` int NOT NULL,
	`conversion_factor` decimal(4,1),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `progress_load_factors` (
	`id` varchar(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
	`exercise_id` varchar(36) NOT NULL,
	`value` decimal(2,1) NOT NULL,
	`muscle_group` enum('SQUAT','BENCH','DEADLIFT','QUADS','GLUTES','HAMSTRINGS','CHEST','BACK','SHOULDER','BICEPS','TRICEPS','CORE') NOT NULL);
--> statement-breakpoint
CREATE INDEX `exercises_exercise_group_id_idx` ON `progress_exercises` (`exercise_group_id`);--> statement-breakpoint
CREATE INDEX `load_factors_exercise_id_idx` ON `progress_load_factors` (`exercise_id`);