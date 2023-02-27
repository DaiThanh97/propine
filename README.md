# Propine Test - Readme

## 1. Local Development Guideline

### Prerequisites

- `Docker` (optional)
- `Makefile` installed (optional)
- NodeJS (v10 or above), `npm` or `yarn`

## Setup Local Development Environment

### I. Manual Steps

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/DaiThanh97/propine-test.git
cd propine-test
```

2. Move `transactions.csv` into `public` folder and update variable `CSV_FILE_NAME` in `.env` to process

3. Execute command line in the back-end. Here are some examples:

```
# Help options
npm run start:crypto -- -h
```

<image src="./public/help.png" />

```
# With token param
npm run start:crypto -- -t BTC

# With date param
npm run start:crypto -- -d 01011990

# With both date and toke params
npm run start:crypto -- -t BTC -d 01011990
```

4. Inspect the results in terminal.

<b>Note</b>: `.env` should not commit along with repo but in case of executing program properly I put it along with the project.

### II. Using Makefile

```
make bootstrap-local
```

## 2. Other Notes

### What I have completed

### 1. Functionalities

<p align="center">
  <image src="./public/diagram.png" />
</p>

1. Followed Dependencies Injection pattern along with NestJS architecture.
2. Streaming csv file using `papaparse`.
3. Handle return the latest portfolio value per token in USD.
4. Handle return the latest portfolio value for specific token in USD.
5. Handle return the portfolio value per token in USD on specific date.
6. Handle return the portfolio value of specific token in USD on specific date.

### 2. Others

1. Local Development Setup script (1 line setup with Makefile)

### What can be improved

1. More unit tests for `back-end`.
2. Research solution to improve reading large file more effectively.
