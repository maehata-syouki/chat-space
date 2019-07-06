# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text||
|string|text||
|user_id|integer|foreign_key: true, null: false|
|group_id|integer|foreign_key: true, null: false|

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|email|string|null: false, unique :true|

### Association
- has_many :groups, through: :user_groups
- has_many :messages
- has_many :user_gruops


## groupsテーブル
|Column|Type|Option|
|------|----|------|
|message_id|integer|foreign_key: true, null: false|
|user_id|integer|foreign_key: true, null: false|
|name|string|null: false|

### Association
- has_many :users, through: :user_groups
- has_many :user_groups
- has_many :messages

## user_groupsテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|foreign_key: true, null: false|
|group_id|integer|foreign_key: true, null: false|

###Association
- belongs_to :user
- belongs_to :group
