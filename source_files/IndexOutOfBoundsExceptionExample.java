package testpackage;

public class IndexOutOfBoundsExceptionExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        int invalidIndex = 10;
        int value = numbers[invalidIndex];

        System.out.println("Value at index " + invalidIndex + ": " + value);
    }
}