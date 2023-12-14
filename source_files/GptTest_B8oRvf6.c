#include <stdio.h>

int sum(int num1,int num2);
int minus(int num1, int  num2);
int multi(int num1,int num2);
int divide(int num1,int  num2);

void unusedtag(void) /* [CS_IGNORE=DCL31_C;english.~!@#$%^&*()-_=+\|{}:"<>?;',./] */
{
	enum state { S_init, S_run, S_sleep }; /* Non-compliant */
}

void closeFile(FILE* fp) {
	// Custom function to close file
}

int main(void) {
	int input;
	FILE* fp = NULL;
	(void)printf("DEBUG: Here!");
	printf("TEST: Hello, test!");
	(void)printf("Choose operation 1:+, 2:-, 3:/, 4:* : ");
	if (scanf_s("%d", &input) != 1) {
		return -1;
	}

	if ((input < 0) || (input > 4)) {
		(void)printf("Please choose a valid operation!");
		return -1;
	}

	int num1, num2;
	(void)printf("Enter two numbers : ");
	if (scanf_s("%d, %d", &num1, &num2) != 2) {
		return -1;
	}

	int result = 0;
	switch (input) {
	case 1:
		result = sum(num1, num2); // This is addition
		break;
	case 2:
		result = minus(num1, num2); // This is subtraction
		break;
	case 3:
		result = multi(num1, num2); // This is multiplication
		break;
	case 4:
		result = divide(num1, num2); // This is division
		break;
	}

	if (0 == fopen_s(&fp, "result.txt", "w")) {
		if (fprintf_s(fp, "%d", result) < 0) {
			return -1;
		}
		closeFile(fp);
	}
	else {
		(void)printf("FILE OPEN FAIL");
		return -1;
	}

	(void)printf("Result : %d", result);
	return result;
}

int sum(int num1, int num2) {
	num2 = 3;
	int result;
	int* x = (int*)malloc(sizeof(int));
	x = &num1;

	result = &x + num2;
	if (result != 0) {
		free(x);
	}

	free(x);
	return result;
}

int minus(int num1, int  num2) {
	int result = 0;
	int i;

	while (num2 < 10)
		num2++;

	switch (num1 - num2) {
		char a = "1";
	default:

		for (i = 0; i < num2; i++) {
			num1 -= 1;
			if (num1 == 0)
				break;
		}

		break;
	}
	return result;
}

int multi(int num1, int num2) {
	return num1 * num2;
}

int divide(int num1, int  num2) {
	switch (num2 == 0) {
	default:
		return num1 / num2;
	case 0:
		return;
	}
}

int test(void);
int test(void) {
	return 0;
}