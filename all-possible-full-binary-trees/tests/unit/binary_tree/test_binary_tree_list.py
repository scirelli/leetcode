# type: ignore
# pylint: disable = too-many-arguments redefined-outer-name
import pytest

from binary_tree.binary_tree_list import BinaryTreeList


@pytest.fixture()
def btree():
    #                       (0)
    #                /               \
    #              (1)               (2)
    #             /     \          /       \
    #           (3)      (4)      (5)      (6)
    #         /    \     /  \    /    \
    #       (7)    (8) (9) (10) (11) (12)
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


@pytest.mark.parametrize(
    ("index", "left_sibling"),
    (
        (2, (1, 1)),
        (4, (3, 3)),
        (6, (5, 5)),
        (8, (7, 7)),
        (10, (9, 9)),
        (12, (11, 11)),
    ),
)
def test_LeftSibling_should_return_the_correct_index_and_value_given_a_node_index(btree, index, left_sibling):
    """
    LeftSibling should return the correct left sibling's index and it's value given a node index.
    """
    bt = BinaryTreeList(btree)
    assert bt.LeftSibling(index) == left_sibling


@pytest.mark.parametrize(
    ("index", "right_sibling"),
    (
        (1, (2, 2)),
        (3, (4, 4)),
        (5, (6, 6)),
        (7, (8, 8)),
        (9, (10, 10)),
        (11, (12, 12)),
    ),
)
def test_RightSibling_should_return_the_correct_index_and_value_given_a_node_index(btree, index, right_sibling):
    """
    RightSibling should return the correct right sibling's index and it's value given a node index.
    """
    bt = BinaryTreeList(btree)
    assert bt.RightSibling(index) == right_sibling


@pytest.mark.parametrize(
    ("index", "right_child"),
    (
        (0, (2, 2)),
        (1, (4, 4)),
        (2, (6, 6)),
        (3, (8, 8)),
        (4, (10, 10)),
        (5, (12, 12)),
    ),
)
def test_RightChild_should_return_the_correct_index_and_value_given_a_node_index(btree, index, right_child):
    """
    RightChild should return the correct right child's index and it's value given a node index.
    """
    bt = BinaryTreeList(btree)
    assert bt.RightChild(index) == right_child


@pytest.mark.parametrize(
    ("index", "left_child"),
    (
        (0, (1, 1)),
        (1, (3, 3)),
        (2, (5, 5)),
        (3, (7, 7)),
        (4, (9, 9)),
        (5, (11, 11)),
    ),
)
def test_LeftChild_should_return_the_correct_index_and_value_given_a_node_index(btree, index, left_child):
    """
    LeftChild should return the correct left child's index and it's value given a node index.
    """
    bt = BinaryTreeList(btree)
    assert bt.LeftChild(index) == left_child


@pytest.mark.parametrize(
    ("index", "parent_node"),
    (
        (1, (0, 0)),
        (2, (0, 0)),
        (3, (1, 1)),
        (4, (1, 1)),
        (5, (2, 2)),
        (6, (2, 2)),
        (7, (3, 3)),
        (8, (3, 3)),
        (9, (4, 4)),
        (10, (4, 4)),
        (11, (5, 5)),
        (12, (5, 5)),
    ),
)
def test_Parent_should_return_the_correct_index_and_value_given_a_node_index(btree, index, parent_node):
    """
    Parent should return the correct parent index and it's value given a node index.
    """
    bt = BinaryTreeList(btree)
    assert bt.Parent(index) == parent_node
