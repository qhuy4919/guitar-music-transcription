from TabDataReprGen import main
from multiprocessing import Pool
import sys

# number of files to process overall
num_filenames = 360
modes = ["c","m","cm","s"]

filename_indices = list(range(num_filenames)) * 1
mode_list = [modes[0]] * 360 

if __name__ == "__main__":
    # number of processes will run simultaneously
    pool = Pool(11)
    inputval = list(zip(filename_indices, mode_list))
    results = pool.starmap(main, inputval)