#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "scopio" <<-EOSQL
  create user scopio with password 'scopio';
  create database scopio_plans;
  grant all privileges on database scopio_plans to scopio;
  \connect scopio_plans scopio
EOSQL
