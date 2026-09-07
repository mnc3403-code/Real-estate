-- 014_seed_demo_data.sql
-- Safe demo dataset for local development / project presentation.
-- Demo password for all seeded accounts: Demo1234!
-- Change/remove these accounts before any real deployment.

INSERT INTO users (first_name,last_name,email,password_hash,role,phone,is_verified)
VALUES
('Ayaan','Rahman','admin@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','admin','+8801700000001',true),
('Rahim','Ahmed','rahim@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','agent','+8801700000002',true),
('Nadia','Karim','nadia@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','agent','+8801700000003',true),
('Faria','Ahmed','faria@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','user','+8801700000004',true),
('Tanvir','Hasan','tanvir@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','user','+8801700000005',true),
('Sadia','Islam','sadia@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','user','+8801700000006',true),
('Mehedi','Hasan','mehedi@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','user','+8801700000007',true),
('Nusrat','Jahan','nusrat@estate.local','$argon2id$v=19$m=65536,t=3,p=4$/WD/XgKZ0UxAWPOWZibdPA$sT4gCBb4jDnTd1wukfDY361dlJvPaBYaBrJk1V0WIog','user','+8801700000008',true)
ON CONFLICT (LOWER(email)) DO UPDATE SET first_name=EXCLUDED.first_name,last_name=EXCLUDED.last_name,role=EXCLUDED.role,is_verified=EXCLUDED.is_verified;

CREATE UNIQUE INDEX IF NOT EXISTS properties_agent_title_unique_idx ON properties(agent_id,title);

INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Gulshan Garden Villa','A spacious family villa with natural light, private parking and a landscaped garden near Gulshan Avenue.','villa','sale','published',24500000,'BDT',4,4,3600,2019,'Road 53','Dhaka','Dhaka','1212','Bangladesh',23.7925,90.4078,true,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Banani Skyline Apartment','Contemporary three-bedroom apartment with balcony, lift, generator and security.','apartment','sale','published',11800000,'BDT',3,2,1650,2021,'Road 11','Dhaka','Dhaka','1213','Bangladesh',23.7937,90.4043,true,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Dhanmondi Lake Duplex','Large duplex close to Dhanmondi Lake with four bedrooms and a private terrace.','house','sale','published',16500000,'BDT',4,4,2900,2018,'Road 7A','Dhaka','Dhaka','1209','Bangladesh',23.7465,90.3760,false,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Uttara Garden Residence','Quiet residential apartment with three bedrooms, open kitchen and excellent road access.','apartment','sale','published',8600000,'BDT',3,3,1450,2020,'Sector 10','Dhaka','Dhaka','1230','Bangladesh',23.8759,90.3795,false,NOW()
FROM users u WHERE u.email='nadia@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Mirpur Modern Family Home','Affordable family home with generous living space and nearby schools and transport.','house','sale','published',7200000,'BDT',3,2,1800,2017,'Section 2','Dhaka','Dhaka','1216','Bangladesh',23.8223,90.3654,false,NOW()
FROM users u WHERE u.email='nadia@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Gulshan Business Suite','Premium furnished office suite suitable for a growing company, with reception and meeting room.','office','rent','published',180000,'BDT',NULL,2,2200,2022,'Gulshan 2','Dhaka','Dhaka','1212','Bangladesh',23.7938,90.4142,true,NOW()
FROM users u WHERE u.email='nadia@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Bashundhara Family Apartment','Bright four-bedroom apartment with modern fittings, community amenities and covered parking.','apartment','rent','published',85000,'BDT',4,3,2100,2023,'Block L','Dhaka','Dhaka','1229','Bangladesh',23.8151,90.4308,false,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Mohakhali Commercial Floor','Open-plan commercial floor near major transport routes, suitable for office or showroom use.','commercial','rent','pending',140000,'BDT',NULL,2,2800,2016,'Wireless Gate','Dhaka','Dhaka','1212','Bangladesh',23.7771,90.3965,false,NULL
FROM users u WHERE u.email='nadia@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Purbachal Residential Land','Residential plot in a developing planned area with road access and clear documentation.','land','sale','published',9500000,'BDT',NULL,NULL,3600,NULL,'Sector 12','Dhaka','Dhaka','1461','Bangladesh',23.8366,90.5210,false,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Baridhara Executive Apartment','Executive apartment with spacious bedrooms, fitted kitchen and controlled-access building.','apartment','sale','published',19800000,'BDT',3,3,2050,2020,'Park Road','Dhaka','Dhaka','1212','Bangladesh',23.7982,90.4200,true,NOW()
FROM users u WHERE u.email='nadia@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;
INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured,published_at)
SELECT u.id,'Uttara Studio for Rent','Compact furnished studio for a professional tenant with utilities and security options.','studio','rent','published',32000,'BDT',1,1,650,2021,'Sector 4','Dhaka','Dhaka','1230','Bangladesh',23.8680,90.3940,false,NOW()
FROM users u WHERE u.email='rahim@estate.local'
ON CONFLICT (agent_id,title) DO NOTHING;

-- Image URLs are data, not frontend constants. Replace with Supabase Storage paths later.
INSERT INTO property_images(property_id,image_url,alt_text,display_order,is_primary)
SELECT p.id, x.url, p.title, 0, true FROM properties p
JOIN (VALUES
('Gulshan Garden Villa','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'),
('Banani Skyline Apartment','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'),
('Dhanmondi Lake Duplex','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'),
('Uttara Garden Residence','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'),
('Mirpur Modern Family Home','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'),
('Gulshan Business Suite','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'),
('Bashundhara Family Apartment','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'),
('Mohakhali Commercial Floor','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'),
('Purbachal Residential Land','https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'),
('Baridhara Executive Apartment','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80'),
('Uttara Studio for Rent','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80')
) AS x(title,url) ON x.title=p.title
WHERE NOT EXISTS (SELECT 1 FROM property_images pi WHERE pi.property_id=p.id);

-- Demo activity
INSERT INTO property_views(property_id,viewer_id,viewed_at)
SELECT p.id,u.id,NOW()-((g.n||' days')::interval) FROM properties p JOIN users u ON u.email='faria@estate.local' CROSS JOIN generate_series(0,5) g(n)
WHERE p.status='published' AND NOT EXISTS (SELECT 1 FROM property_views pv WHERE pv.property_id=p.id AND pv.viewer_id=u.id);

INSERT INTO saved_properties(user_id,property_id)
SELECT u.id,p.id FROM users u JOIN properties p ON p.title IN ('Banani Skyline Apartment','Gulshan Garden Villa','Baridhara Executive Apartment')
WHERE u.email='faria@estate.local' ON CONFLICT DO NOTHING;

INSERT INTO inquiries(property_id,customer_id,agent_id,subject,message,customer_phone,status)
SELECT p.id,c.id,p.agent_id,'Viewing request','I would like to know whether this property is available for a viewing this week.',c.phone,'new'
FROM properties p JOIN users c ON c.email='faria@estate.local' WHERE p.title='Banani Skyline Apartment'
AND NOT EXISTS (SELECT 1 FROM inquiries i WHERE i.property_id=p.id AND i.customer_id=c.id);

INSERT INTO inquiries(property_id,customer_id,agent_id,subject,message,customer_phone,status)
SELECT p.id,c.id,p.agent_id,'Price clarification','Could you share the latest price and available payment options?',c.phone,'contacted'
FROM properties p JOIN users c ON c.email='tanvir@estate.local' WHERE p.title='Gulshan Garden Villa'
AND NOT EXISTS (SELECT 1 FROM inquiries i WHERE i.property_id=p.id AND i.customer_id=c.id);

INSERT INTO appointments(property_id,customer_id,agent_id,scheduled_start,scheduled_end,status,notes,meeting_location)
SELECT p.id,c.id,p.agent_id,NOW()+interval '3 days',NOW()+interval '3 days 1 hour','confirmed','Property viewing','Property location'
FROM properties p JOIN users c ON c.email='faria@estate.local' WHERE p.title='Banani Skyline Apartment'
AND NOT EXISTS (SELECT 1 FROM appointments a WHERE a.property_id=p.id AND a.customer_id=c.id);

INSERT INTO notifications(user_id,type,title,message)
SELECT u.id,'property','Welcome to Estate','Your demo customer workspace is ready. Explore properties and save your favourites.'
FROM users u WHERE u.email='faria@estate.local'
AND NOT EXISTS (SELECT 1 FROM notifications n WHERE n.user_id=u.id AND n.title='Welcome to Estate');

INSERT INTO notifications(user_id,type,title,message)
SELECT u.id,'inquiry','New customer inquiry','A customer has submitted an inquiry about one of your listings.'
FROM users u WHERE u.email='rahim@estate.local'
AND NOT EXISTS (SELECT 1 FROM notifications n WHERE n.user_id=u.id AND n.title='New customer inquiry');

INSERT INTO admin_reports(reporter_id,property_id,reason,description,status)
SELECT u.id,p.id,'incorrect_information','The listing needs verification of the advertised property details.','open'
FROM users u JOIN properties p ON p.title='Mohakhali Commercial Floor'
WHERE u.email='tanvir@estate.local'
AND NOT EXISTS (SELECT 1 FROM admin_reports r WHERE r.property_id=p.id AND r.reporter_id=u.id);

INSERT INTO message_threads(property_id,customer_id,agent_id,inquiry_id)
SELECT i.property_id,i.customer_id,i.agent_id,i.id FROM inquiries i
WHERE NOT EXISTS (SELECT 1 FROM message_threads mt WHERE mt.inquiry_id=i.id);

INSERT INTO messages(thread_id,sender_id,body)
SELECT mt.id,mt.customer_id,'Hello, I am interested in arranging a viewing.' FROM message_threads mt
JOIN users u ON u.id=mt.customer_id
WHERE u.email='faria@estate.local'
AND NOT EXISTS (SELECT 1 FROM messages m WHERE m.thread_id=mt.id);
