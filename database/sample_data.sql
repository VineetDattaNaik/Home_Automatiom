-- Insert sample energy usage data
INSERT INTO energy_usage (period_type, time_labels, usage_values, total_usage, comparison)
VALUES 
('today', 
 '["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"]',
 '[20, 15, 25, 30, 35, 40, 45, 35]',
 245,
 '↑ 5% more than yesterday');

-- Get the inserted id
DO $$ 
DECLARE 
    last_id INTEGER;
BEGIN
    SELECT id INTO last_id FROM energy_usage ORDER BY id DESC LIMIT 1;

    -- Insert corresponding appliance data
    INSERT INTO appliance_usage (usage_id, period_type, name, usage, percentage)
    VALUES 
    (last_id, 'today', 'Air Conditioner', 90, 37),
    (last_id, 'today', 'Refrigerator', 40, 16),
    (last_id, 'today', 'Lighting', 35, 14),
    (last_id, 'today', 'Water Heater', 45, 18);
END $$;