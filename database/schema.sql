-- Energy usage table
CREATE TABLE energy_usage (
    id SERIAL PRIMARY KEY,
    period_type VARCHAR(10) NOT NULL CHECK (period_type IN ('today', 'week', 'month')),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    time_labels JSONB NOT NULL,
    usage_values JSONB NOT NULL,
    total_usage DECIMAL NOT NULL,
    comparison TEXT NOT NULL
);

-- Appliance usage table
CREATE TABLE appliance_usage (
    id SERIAL PRIMARY KEY,
    usage_id INTEGER REFERENCES energy_usage(id),
    period_type VARCHAR(10) NOT NULL CHECK (period_type IN ('today', 'week', 'month')),
    name VARCHAR(100) NOT NULL,
    usage DECIMAL NOT NULL,
    percentage DECIMAL NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_energy_usage_period_type ON energy_usage(period_type);
CREATE INDEX idx_appliance_usage_usage_id ON appliance_usage(usage_id);